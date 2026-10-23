export default {
  moduleNameMapper: {
    // Ignore CSS files!
    "\\.css$": "<rootDir>/test/styleStub.js",
    // Ignore image files!
    "\\.(png|jpe?g|gif|svg|webp)$": "<rootDir>test/fileStub.js",
  },
};
