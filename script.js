const canvasWidth = 800;
const canvasHeight = 600;
const lineThickness = 6; // Thickness of black lines
const colors = [
  '#FFFFFF', // White
  '#CC000B', // Red
  '#0166BA', // Blue
  '#F9D51A', // Yellow
];

// Recursive splitting function
function splitRegion(ctx, x, y, width, height, depth) {
  // Base case: Stop splitting if maximum depth is reached
  if (depth <= 0 || width < 50 || height < 50) {
	// Fill the region with a random color
	const color = Math.random() < 0.6 ? '#FFFFFF' : colors[Math.floor(Math.random() * colors.length)];
	ctx.fillStyle = color;
	ctx.fillRect(x, y, width, height);
	return;
  }

  // Randomly decide whether to split vertically or horizontally
  const splitVertically = width > height ? Math.random() < 0.75 : Math.random() >= 0.75;

  if (splitVertically) {
	// Split vertically
	const splitX = x + Math.floor(Math.random() * (width * 0.4) + width * 0.3); // Random position within bounds

	// Recursively split the regions
	splitRegion(ctx, x, y, splitX - x, height, depth - 1); // Left region
	splitRegion(ctx, splitX, y, x + width - splitX, height, depth - 1); // Right region

	// Draw vertical black dividing line
	ctx.fillStyle = '#000000';
	ctx.fillRect(splitX - lineThickness / 2, y, lineThickness, height);
  } else {
	// Split horizontally
	const splitY = y + Math.floor(Math.random() * (height * 0.4) + height * 0.3); // Random position within bounds

	// Recursively split the regions
	splitRegion(ctx, x, y, width, splitY - y, depth - 1); // Top region
	splitRegion(ctx, x, splitY, width, y + height - splitY, depth - 1); // Bottom region

	// Draw horizontal black dividing line
	ctx.fillStyle = '#000000';
	ctx.fillRect(x, splitY - lineThickness / 2, width, lineThickness);
  }
}

// Generate the Mondrian-style image
function generateMondrian(ctx) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight); // Clear the canvas
  splitRegion(ctx, 0, 0, canvasWidth, canvasHeight, 4); // Start recursive splitting with depth 4
}

// Save the canvas as an image
function saveCanvas(canvas) {
  const link = document.createElement('a');
  link.download = 'mondrian.png';
  link.href = canvas.toDataURL();
  link.click();
}

// Setup the application
function setup() {
  const app = document.getElementById('app');

  // Create the canvas
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  app.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  // Create buttons
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.addEventListener('click', () => saveCanvas(canvas));
  app.appendChild(saveButton);

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.addEventListener('click', () => generateMondrian(ctx));
  app.appendChild(nextButton);

  // Generate the initial pattern
  generateMondrian(ctx);
}

// Initialize the application
window.onload = setup;
