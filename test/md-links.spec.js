import { pathExists, isMD } from "./api.js";
import { mdLinks } from "./mdLinks.js";

describe("mdLinks", () => {
  // Mock de la función pathExists
  jest.mock("./api.js", () => ({
    pathExists: jest.fn(),
    isMD: jest.fn(),
  }));

  it("debería resolver la promesa si el path existe y es un archivo MD", () => {
    // Mock de pathExists para que retorne true
    pathExists.mockReturnValue(true);
    // Mock de isMD para que retorne true
    isMD.mockReturnValue(true);

    return mdLinks("README.md").then(() => {
      expect(pathExists).toHaveBeenCalledWith("README.md");
      expect(isMD).toHaveBeenCalledWith("README.md");
      expect(console.log).toHaveBeenCalledWith("Si existe");
      expect(console.log).toHaveBeenCalledWith("Si es MD");
    });
  });

  it("debería rechazar la promesa si el path no existe", () => {
    // Mock de pathExists para que retorne false
    pathExists.mockReturnValue(false);

    return expect(mdLinks("README.md")).rejects.toEqual("No existe");
  });
});
