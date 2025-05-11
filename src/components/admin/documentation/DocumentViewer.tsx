
import React, { useState } from 'react';
import { File, FileSearch } from 'lucide-react';
import { DocumentItem } from './types';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { callOpenAI, ChatCompletionResponse } from '@/utils/openai-client';

interface DocumentViewerProps {
  document: DocumentItem | null;
}

// Simple markdown renderer function
const renderMarkdown = (content: string): string => {
  if (!content) return '';
  
  // Basic markdown formatting with regex
  return content
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold my-4">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold my-4">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold my-5">$1</h1>')
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic text
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded my-4 overflow-auto"><code>$1</code></pre>')
    // Inline code
    .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">$1</code>')
    // Lists
    .replace(/^\- (.*$)/gm, '<li class="ml-6">$1</li>')
    // Line breaks and paragraphs
    .replace(/\n/g, '<br />')
    // Tables (basic support)
    .replace(/\|\s*(.*?)\s*\|/g, '<table class="border-collapse w-full my-4"><tr><td class="border border-gray-300 dark:border-gray-700 p-2">$1</td></tr></table>');
};

export const DocumentViewer = ({ document }: DocumentViewerProps) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);

  if (!document) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <File className="h-16 w-16 mb-4" />
        <p className="text-lg">Select a document to view</p>
      </div>
    );
  }

  const renderContent = () => {
    switch (document.type) {
      case 'pdf':
        return (
          <iframe
            src={document.url}
            className="w-full h-full"
            title={document.title}
          />
        );
      case 'text':
      case 'markdown':
        return (
          <div className="p-6 prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: renderMarkdown(document.content || '') }} />
          </div>
        );
      case 'image':
        return (
          <div className="flex items-center justify-center h-full">
            <img src={document.url} alt={document.title} className="max-h-full max-w-full" />
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-lg text-gray-400">Preview not available</p>
            {document.url && (
              <a 
                href={document.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Download
              </a>
            )}
          </div>
        );
    }
  };

  const generateSummary = async () => {
    const apiKey = localStorage.getItem('openai-api-key');
    
    if (!apiKey) {
      toast.error("Please configure your OpenAI API key in the Tech Hub > API Management section");
      return;
    }
    
    if (!document.content) {
      toast.error("No content available for summarization");
      return;
    }
    
    setIsSummarizing(true);
    
    try {
      const model = localStorage.getItem('openai-preferred-model') || 'gpt-4o-mini';
      
      const result = await callOpenAI<ChatCompletionResponse>({
        endpoint: 'chat',
        payload: {
          model,
          messages: [
            { 
              role: "system", 
              content: "You are a helpful document summarization assistant. Create a concise summary of the provided document." 
            },
            { 
              role: "user", 
              content: `Please summarize this document in 3-5 key points: ${document.content}` 
            }
          ],
          temperature: 0.5,
          max_tokens: 500
        },
        apiKey
      });
      
      if (result.choices && result.choices[0]?.message) {
        setSummary(result.choices[0].message.content);
        toast.success("Summary generated successfully");
      }
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("Failed to generate summary");
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="h-full border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      <div className="px-4 py-3 border-b flex justify-between items-center bg-gradient-to-r from-nxt-darkRed to-nxt-red text-white">
        <h3 className="text-lg font-medium truncate">{document.title}</h3>
        <div className="flex space-x-2">
          {document.url && (
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-sm bg-white hover:bg-gray-100 text-nxt-darkRed border-white"
            >
              <a 
                href={document.url} 
                download
              >
                Download
              </a>
            </Button>
          )}
          {document.type === 'text' || document.type === 'markdown' ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-sm text-white hover:bg-white/20"
              onClick={generateSummary}
              disabled={isSummarizing}
            >
              <FileSearch className="h-4 w-4 mr-1" />
              {isSummarizing ? 'Summarizing...' : 'Summarize'}
            </Button>
          ) : null}
          <Button
            variant="ghost"
            size="sm"
            className="text-sm text-white hover:bg-white/20"
            onClick={() => window.print()}
          >
            Print
          </Button>
        </div>
      </div>
      <div className="h-[calc(100%-3.5rem)] overflow-auto">
        {summary ? (
          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
            <h4 className="font-bold mb-2 flex items-center">
              <FileSearch className="h-4 w-4 mr-1" /> AI-Generated Summary
            </h4>
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: renderMarkdown(summary) }} />
            </div>
            <div className="mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setSummary(null)}
              >
                Hide Summary
              </Button>
            </div>
          </div>
        ) : null}
        {renderContent()}
      </div>
    </div>
  );
};
