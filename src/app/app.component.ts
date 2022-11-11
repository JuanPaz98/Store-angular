import { Component, Input } from '@angular/core';
import { User, UserDTO } from './models/user';
import { AuthService } from './services/auth.service'
import { UsersService } from './services/users.service'
import { FilesService } from './services/files.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imageParent: string = '../assets/paila.jpg';
  showImage = true
  imgRta = ''
  

  constructor(private authSvc: AuthService, private userSvc: UsersService, private fileSvc: FilesService){}

  onLoaded(img: string){
    console.log("epa la arepa desde el padre" , img)
  }
  toggleImg(){
    this.showImage = !this.showImage
  }

  createUser(){
    this.userSvc.createUser({
      email: 'Jjfer032@gmail.com', 
      password: '123458', 
      name: 'Juan Paz'
    }).subscribe(user =>{
       console.log(user)
    })
  }
 
  delete(){
    this.userSvc.deleteUser(1).subscribe( rta =>{
      console.log(rta)
    })
  }
  download(){
    return  this.fileSvc.getFile('pdf_random', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0) as Blob
    if (file){
      this.fileSvc.uploadFile(file)
      .subscribe(rta =>{
        console.log('Upload', rta)
        this.imgRta = rta.location
      })
    }
  }
}
