import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { SessionService } from "./services/session.service";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { AuthComponentComponent } from "./components/auth-component/auth-component.component";

@NgModule({
  declarations: [AppComponent, AuthComponentComponent],
  imports: [BrowserModule, FormsModule, HttpModule],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule {}
