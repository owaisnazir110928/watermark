const { PDFDocument, rgb, degrees } = require("pdf-lib");
const fs = require("fs");



// Usage example:
const pdfPath = "input.pdf";
const email = "owaisnazir110928@gmail.com";
const userName = "Owais Nazir Dar";
const utcdate = new Date("01/10/2023");
const date = utcdate.toLocaleDateString();
const watermarkText = `Accessed by: ${userName}\nEmail ID: ${email}\nPurchased on: ${date}`;
const svgPath = "profile.svg";
const outputPath = "output.pdf";

addWatermarkToPdf(pdfPath, watermarkText, svgPath, outputPath);
