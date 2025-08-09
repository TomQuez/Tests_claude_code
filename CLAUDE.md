# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive data visualization web application built with vanilla HTML, CSS, and JavaScript using D3.js v7. The application features a dashboard with three main chart types: bar charts, pie charts, and line charts with smooth animations and interactive tooltips.

## Architecture

### Core Files
- `data_visualization.html` - Main application file containing HTML structure and JavaScript logic
- `styles.css` - External stylesheet with modern CSS styling and animations

### Technology Stack
- **D3.js v7** - Data visualization library (loaded from CDN)
- **Vanilla JavaScript (ES6+)** - Client-side logic and chart rendering
- **Modern CSS3** - Styling with gradients, transitions, and flexbox layouts

### Application Structure
The application uses a modular approach with separate functions for each chart type:
- `createBarChart()` - Renders animated bar chart for sales performance
- `createPieChart()` - Creates donut chart for market share visualization  
- `createLineChart()` - Draws trend line with gradient fill and animated path drawing
- `updateData()` - Generates new random data and redraws all charts
- Interactive controls for data generation, animations, and theme switching

## Development Workflow

### Running the Application
```bash
# Option 1: Open directly in browser
chromium-browser data_visualization.html

# Option 2: Start local server and navigate to localhost:8000
python -m http.server 8000
```

### Testing Changes
Since this is a client-side application with no build process:
1. Make changes to HTML, CSS, or JavaScript
2. Refresh browser to see updates immediately
3. Use browser developer tools for debugging and performance analysis

### Data Structure
The application uses two main data arrays:
- `salesData` - Array of objects with product, sales, and color properties
- `trendData` - Array of objects with month and value properties

Both datasets are generated with random values via the "Generate New Data" button for testing different scenarios.

### Interactive Features
- Hover tooltips with detailed data points
- Smooth entrance animations for all chart elements
- Theme toggle between light and dark modes
- Responsive layout that adapts to different screen sizes
- Chart animation controls for demonstrations

## Code Conventions

### D3.js Patterns
- Use D3's data binding pattern with `.data()`, `.enter()`, and `.exit()`
- Implement smooth transitions with `.transition()` and `.duration()`
- Handle mouse events for tooltips with proper cleanup
- Use appropriate scales (scaleBand, scaleLinear, scalePoint) for different chart types

### Styling Approach
- External CSS file for maintainability
- CSS custom properties could be added for theming
- Hover states and micro-interactions for enhanced UX
- Consistent spacing and color schemes across components