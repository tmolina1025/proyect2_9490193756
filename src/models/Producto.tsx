export class Producto {
  constructor(
    public id: number = 0,
    public Identificador: string = '',
    public Nombre: string = '',
    public Marca: string = '',
    public Disponibilidad: number = 0,
    public Precio: number = 0,
    public Descuento: number = 0,
    public PrecioDescuento: number = 0,
    public Imagen: string = '',
    public Descripcion: string = '',
    public Categorias: string = '',
    public Habilitado: boolean = true
  ) {}

}
