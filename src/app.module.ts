import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { configValidationSchema } from './config.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarcaModule } from './marca/marca.module';
import { TipoModule } from './tipo/tipo.module';
import { LineaModule } from './linea/linea.module';
import { ModeloModule } from './modelo/modelo.module';
import { MotocicletasModule } from './motocicletas/motocicletas.module';
import { Articulos_motocicletasModule } from './articulos_motocicletas/articulos_motocicletas.module';
import { ProductModule } from './product/product.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { ClienteModule } from './cliente/cliente.module';
import { CategoriaModule } from './categoria/categoria.module';
import { Articulos_provedoresModule } from './articulos_provedores/articulos_provedores.module';
import { Detalles_ventasModule } from './detalles_ventas/detalles_ventas.module';
import { AlmacenModule } from './almacen/almacen.module';
import { VentasModule } from './ventas/ventas.module';
import { ClientesModule } from './clientes/clientes.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { SucursalesModule } from './sucursales/sucursales.module';
import { ProvedoresModule } from './provedores/provedores.module';
import { ArticulosModule } from './articulos/articulos.module';
import { Detalles_pedidosModule } from './detalle_pedidos/detalles_pedidos.module';
import { PedidosModule } from './pedidos/pedidos.module';
// import { ArticuloModule } from './articulo/articulo.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { ArticleprovModule } from './articleProv/articleprov.module';
import { StockModule } from './stock/stock.module';
import { SupplierModule } from './supplier/supplier.module';
import { OrderdetModule } from './orderdet/orderdet.module';
import { OrderModule } from './order/order.module';
import { SucurModule } from './sucur/sucur.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isPoduction = configService.get('STAGE') === 'prod';
        return {
          ssl: isPoduction,
          extra: {
            ssl: isPoduction ? { rejectUnauthorized: false } : null,
          },
          // type: 'mysql',
          type: 'mariadb',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST') || 'localhost',
          port: configService.get('DB_PORT') || 3306,
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    AuthModule,
    // // PostModule,
    // ClienteModule,
    MarcaModule,
    TipoModule,
    LineaModule,
    ModeloModule,
    MotocicletasModule,
    Articulos_motocicletasModule,
    ProductModule,
    // ProveedorModule,
    // ArticuloModule,
    CategoriaModule,
    ArticulosModule,
    Articulos_provedoresModule,
    ProvedoresModule,
    SucursalesModule,
    UsuariosModule,
    ClientesModule,
    VentasModule,
    AlmacenModule,
    Detalles_ventasModule,
    PedidosModule,
    Detalles_pedidosModule,

    ProveedorModule,
    ClienteModule,
    // ArticuloModule,
    ArticleModule,
    CategoryModule,
    ArticleprovModule,
    StockModule,
    SupplierModule,
    OrderdetModule,
    OrderModule,
    SucurModule,
  ],
  // controllers: [AppController, MarcaController, TipoController, LineaController, ModeloController, MotocicletasController, Articulos_motocicletasController,/*  ProductController, ProveedorController,ArticuloController, */CategoriaController, ArticulosController, Articulos_provedoresController, ProvedoresController, SucursalesController, UsuariosController, ClientesController, VentasController, AlmacenController, Detalles_ventasController, PedidosController, Detalles_pedidosController],
  // providers: [AppService, MarcaService, TipoService, LineaService, ModeloService, MotocicletasService, Articulos_motocicletasService, /* ProductService, ProveedorService, ArticuloService, */CategoriaService, ArticulosService, Articulos_provedoresService, ProvedoresService, SucursalesService, UsuariosService, ClientesService, VentasService, AlmacenService, Detalles_ventasService, PedidosService, Detalles_pedidosService],
})
export class AppModule {}
