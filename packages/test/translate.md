# FastMCP

A TypeScript framework for building [MCP](https://glama.ai/mcp) servers capable of handling client sessions.

> [!NOTE]
>
> For a Python implementation, see [FastMCP](https://github.com/jlowin/fastmcp).

## Features

- Simple Tool, Resource, Prompt definition
- [Authentication](#authentication)
- [Passing headers through context](#passing-headers-through-context)
- [Sessions](#sessions)
- [Image content](#returning-an-image)
- [Audio content](#returning-an-audio)
- [Embedded](#embedded-resources)
- [Logging](#logging)
- [Error handling](#errors)
- [HTTP Streaming](#http-streaming) (with SSE compatibility)
- CORS (enabled by default)
- [Progress notifications](#progress)
- [Streaming output](#streaming-output)
- [Typed server events](#typed-server-events)
- [Prompt argument auto-completion](#prompt-argument-auto-completion)
- [Sampling](#requestsampling)
- [Configurable ping behavior](#configurable-ping-behavior)
- [Health-check endpoint](#health-check-endpoint)
- [Roots](#roots-management)
- CLI for [testing](#test-with-mcp-cli) and [debugging](#inspect-with-mcp-inspector)
