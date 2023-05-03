const {mdLinks} = require('../index.js');


describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });
  it('devolver promesa', () => {
    expect(mdLinks()).toBe(typeof Promise);
});
it("Debe recahazar cuando el path no existe"), () => {
  return mdLinks("/estepath/no/existe.md").catch((error) => {
    expect(error).toBe("la ruta no existe");
})

});

