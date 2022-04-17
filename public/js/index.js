let fileToUpload = new File([], 'default.txt')

//Retorna o tamanho com uma string
function buildSize(bytes){

  const gigaToBytes = Math.pow(10, 9)
  const megaToBytes = Math.pow(10, 6)
  const kiloToBytes = Math.pow(10, 3)

  const giga = bytes / gigaToBytes
  const mega = bytes / megaToBytes
  const kilo = bytes / kiloToBytes

  
  //const resto = bytes % Math.pow(1, 9)
  if(Math.trunc(giga) > 0){
    return `${giga}GB`
  }else if (Math.trunc(mega) > 0){
    return `${mega}MB`
  }else if (Math.trunc(kilo) > 0){
    return `${mega}KB`
  }
  return `${bytes}bytes`
}

function loadFile(file){
  fileToUpload = file
  console.log(fileToUpload)
}

function importar(){
  const inputFile = document.getElementById('file-upload')

  const file = inputFile.files[0]

  console.log(buildSize(file.size))
}

function selectedPage(){
  path = window.location.pathname
  const menuHome = document.getElementById('menu-home')
  const menuAbout = document.getElementById('menu-about')
  if(path === '/'){
    menuHome.setAttribute('class', 'active')
    menuAbout.setAttribute('class', '')
  } else {
    menuAbout.setAttribute('class', 'active')
    menuHome.setAttribute('class', '')
  }
}

window.onload = selectedPage