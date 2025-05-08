import { callMcpTool, exampleSearchServers } from '../utils/mcpToolCaller';

/**
 * Example script demonstrating the usage of callMcpTool utility
 * to interact with MCP tools from the Smithery Toolbox.
 */

// Direct usage of callMcpTool with custom parameters
console.log("Using callMcpTool directly:");
callMcpTool({
  serverName: 'smithery/toolbox',
  toolName: 'search_servers',
  arguments: {
    query: 'weather'
  }
});

// Using the predefined example function for search_servers
console.log("\nUsing exampleSearchServers function:");
exampleSearchServers('context');

// Note: The actual implementation would depend on the system's ability to process these calls.
// For now, this script logs the intended action to simulate the tool invocation.