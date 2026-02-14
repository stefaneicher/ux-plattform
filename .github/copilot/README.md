# MCP Server Configuration for GitHub Copilot

This directory contains the MCP (Model Context Protocol) server configuration for GitHub Copilot.

## What is MCP?

MCP (Model Context Protocol) is a protocol that allows AI assistants like GitHub Copilot to connect to external tools and data sources. This enables Copilot to interact with services like Render.com directly from your development environment.

## Configured MCP Servers

### Render MCP Server

The Render MCP server allows GitHub Copilot to interact with your Render.com deployments directly. You can:

- List your Render services
- Check deployment status
- View service logs
- Manage environment variables
- Trigger deployments

## Setup Instructions

### Prerequisites

1. **GitHub Copilot Subscription**: You need an active GitHub Copilot subscription
2. **Render API Key**: Obtain your Render API key from [Render Dashboard](https://dashboard.render.com/u/settings#api-keys)

### Configuration Steps

1. **Set Up Your Render API Key**

   You need to configure your Render API key as an environment variable. There are several ways to do this:

   **Option A: User-level environment variable (Recommended)**
   ```bash
   # Add to your ~/.bashrc or ~/.zshrc
   export RENDER_API_KEY="your_render_api_key_here"
   ```

   **Option B: VS Code Settings**
   
   Add to your VS Code `settings.json`:
   ```json
   {
     "github.copilot.advanced": {
       "mcp": {
         "env": {
           "RENDER_API_KEY": "your_render_api_key_here"
         }
       }
     }
   }
   ```

   **Option C: Project-level .env file**
   
   Create a `.env` file in the project root (DO NOT commit this file):
   ```
   RENDER_API_KEY=your_render_api_key_here
   ```

2. **Verify Configuration**

   Once configured, GitHub Copilot will automatically detect the MCP server configuration in `.github/copilot/mcp-servers.json` and connect to the Render MCP server.

3. **Reload VS Code**

   After setting up the API key, reload VS Code to ensure the changes take effect.

## Using the Render MCP Server

Once configured, you can ask GitHub Copilot questions or give commands related to your Render deployments:

### Example Prompts

- "Show me the status of my Render services"
- "What are the recent logs for my backend service?"
- "List all my Render deployments"
- "What environment variables are configured for the frontend service?"
- "Trigger a deployment for the backend service"

### Available Commands

The Render MCP server provides access to various Render API operations:

- **Service Management**: List, create, update, and delete services
- **Deployment Management**: View deployment history and trigger new deployments
- **Logs**: Access service logs for debugging
- **Environment Variables**: View and manage environment variables
- **Health Checks**: Monitor service health and status

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never commit API keys**: Make sure your `.env` file or any file containing API keys is listed in `.gitignore`
2. **Use read-only keys when possible**: If you only need to view information, consider using a read-only API key
3. **Rotate keys regularly**: Regularly rotate your API keys as a security best practice
4. **Limit key permissions**: Use the minimum required permissions for your API key

## Troubleshooting

### MCP Server Not Working

If the MCP server doesn't seem to be working:

1. **Check API Key**: Ensure your `RENDER_API_KEY` environment variable is set correctly
2. **Restart VS Code**: Try restarting VS Code to reload the configuration
3. **Check Copilot Status**: Ensure GitHub Copilot is running and connected
4. **Verify Node/NPM**: The MCP server requires Node.js and npm to be installed

### Common Issues

**Issue**: "Cannot find module '@render/mcp-server'"
- **Solution**: The MCP server will be automatically installed via `npx` when first used. Ensure you have internet connectivity.

**Issue**: "Authentication failed"
- **Solution**: Verify your Render API key is correct and has the necessary permissions.

**Issue**: "MCP server not responding"
- **Solution**: Try restarting VS Code or check your internet connection.

## Additional MCP Servers

You can add more MCP servers to the configuration by editing `.github/copilot/mcp-servers.json`. For example:

```json
{
  "mcpServers": {
    "render": {
      "command": "npx",
      "args": ["-y", "@render/mcp-server"],
      "env": {
        "RENDER_API_KEY": "${RENDER_API_KEY}"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

## Resources

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Render API Documentation](https://api-docs.render.com/)
- [GitHub Copilot MCP Support](https://docs.github.com/copilot)
- [Render Dashboard](https://dashboard.render.com/)

## Support

If you encounter issues with the MCP configuration:

1. Check the [Render MCP Server GitHub Repository](https://github.com/render/mcp-server)
2. Open an issue in this repository
3. Contact Render support for API-related questions

---

**Last Updated**: February 12, 2026
