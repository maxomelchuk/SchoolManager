import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function startApp() {
  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('School')
      .setDescription('REST API Documentation')
      .setVersion('1.0.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api', app, document);

    // TODO add login&pass for swagger page

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );

    app.enableShutdownHooks();

    app.enableCors({
      origin: '*',
    });

    await app.listen(PORT, () => {
      console.log(`server started on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
startApp();
