import { StrengthPipe } from "./strength.pipe"


// testes do StrengthPipe
describe('StrengthPipe', () => {
  it('should display weak if strengh is 5', () => {
    let pipe = new StrengthPipe();
    const val = pipe.transform(5);
    expect(val).toEqual('5 (weak)');
  });

  it('should display weak if strengh is 20', () => {
    let pipe = new StrengthPipe();
    const val = pipe.transform(20);
    expect(val).toEqual('20 (unbelievable)');
  });

  it('should display weak if strengh is 15', () => {
    let pipe = new StrengthPipe();
    const val = pipe.transform(15);
    expect(val).toEqual('15 (strong)');
  });

});
