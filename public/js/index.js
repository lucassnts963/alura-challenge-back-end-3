let fileToUpload = new File([], 'default.txt')

function selectedPage(){
  path = window.location.pathname
  console.log(path)
  const menuHome = document.getElementById('menu-home')
  const menuAbout = document.getElementById('menu-about')
  const menuSignIn = document.getElementById('menu-user')
  if(path === '/'){
    menuHome.setAttribute('class', 'active')
    menuAbout.setAttribute('class', '')
    menuSignIn.setAttribute('class', '')
  } else if(path === '/about'){
    menuHome.setAttribute('class', '')
    menuAbout.setAttribute('class', 'active')
    menuSignIn.setAttribute('class', '')
  } else if(path === '/users/novo'){
    menuHome.setAttribute('class', '')
    menuAbout.setAttribute('class', '')
    menuSignIn.setAttribute('class', 'active')
  }
}

window.onload = selectedPage
