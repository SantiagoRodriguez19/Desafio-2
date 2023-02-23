import {promises as fs} from "fs"



function * idFactory() {
    let id = 0
    while (true) { yield ++id }
  }
  
  const makeProductId = idFactory()


class ProductManager{
    constructor(){
        this.path = "./productos.txt"
        this.products = []
    }
    //static id = 0

    addProduct = async(title, description, price, image, code, stock, id)=>{
        let newProduct = {
            title,
            description,
            price,
            image,
            code,
            stock,
            id:  id ?? makeProductId.next().value
        }

        this.products.push(newProduct)

        //console.log(newProduct);


        


    await fs.writeFile(this.path, JSON.stringify (this.products))
    }

    readProducts = async()=>{
        let response = await fs.readFile(this.path, "utf-8")
        return JSON.parse (response)
    }


    getProducts = async()=>{
        let response2 = await this.readProducts()
        return console.log(response2)
    }

    getProductsById = async(id)=>{
        let response3 = await this.readProducts()
        if(!response3.find(product => product.id === id)){
            console.log("Producto no encontrado");
        }else{
            console.log(response3.find(product => product.id === id));
            }

        //console.log(filter)
    }

    updateProducts = async({id, ...producto})=>{
        await this.deleteProductById(id)
        let productOld = await this.readProducts()
        //console.log(productOld);
        let productsModif = [{ ...producto, id}, ...productOld];
        await fs.writeFile(this.path, JSON.stringify (productsModif))
        
    }



    deleteProductById = async(id)=>{
        let response4 = await this.readProducts();
        let productFilter = response4.filter(products => products.id != id)
        await fs.writeFile(this.path, JSON.stringify (productFilter))
        console.log("Producto eliminado");
    }
}

const productos = new ProductManager

/*productos.addProduct("Titulo1", "Descripcion1",  1000, "Imagen1", "abc123", 5)
productos.addProduct("Titulo2", "Descripcion2",  2000, "Imagen2", "abc124", 10)
productos.addProduct("Titulo3", "Descripcion3",  3000, "Imagen3", "abc125", 25)*/


//productos.getProducts()

//productos.getProductsById(4)

//productos.deleteProductById(2)

productos.updateProducts({ 
title: 'Titulo1',
description: 'Descripcion1',
price: 1500,
image: 'Imagen1',
code: 'abc123',
stock: 5,
id: 1
})