class User {
    CorreoElectronico: string;
    Clave: string;
    ValidacionClave: string;
    Nombres: string;
    Apellidos: string;
    FechaNacimiento: string;
    DireccionEntrega: string;
    NIT: string;
    NumeroTelefonico: string;
    DPI: string;
  
    constructor(
      CorreoElectronico: string = '',
      Clave: string = '',
      ValidacionClave: string = '',
      Nombres: string = '',
      Apellidos: string = '',
      FechaNacimiento: string = '',
      DireccionEntrega: string = '',
      NIT: string = '',
      NumeroTelefonico: string = '',
      DPI: string = ''
    ) {
      this.CorreoElectronico = CorreoElectronico;
      this.Clave = Clave;
      this.ValidacionClave = ValidacionClave;
      this.Nombres = Nombres;
      this.Apellidos = Apellidos;
      this.FechaNacimiento = FechaNacimiento;
      this.DireccionEntrega = DireccionEntrega;
      this.NIT = NIT;
      this.NumeroTelefonico = NumeroTelefonico;
      this.DPI = DPI;
    }
  }
  
  export default User;
  