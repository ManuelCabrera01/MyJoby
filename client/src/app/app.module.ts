import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { SessionService } from "./services/session.service";
import { AppComponent } from "./app.component";
import { AuthComponentComponent } from "./components/auth-component/auth-component.component";

@NgModule({
  declarations: [AppComponent, AuthComponentComponent],
  imports: [BrowserModule],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule {}
