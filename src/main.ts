import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Припустимо, що ваш кореневий модуль називається AppModule

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err) => console.error(err));
