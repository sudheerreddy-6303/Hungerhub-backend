import React,{useState,useEffect} from 'react'
import { API_Path } from '../Helpers/ApiPath';


const AllProducts = () => {
    const [products,setProducts]=useState([]);

    const producthandler=async()=>{
        const firmid=localStorage.getItem("firmid");
        // if(!firmid){
        //     alert("please login first")
            
        //     return;
        // }
        try {
            const response=await fetch(`${API_Path}product/${firmid}/products`);
            // console.log("this is response",response)
            const newproductsdata=await response.json();
            // console.log("thjs isb hlo",newproductsdata)
            setProducts(newproductsdata?.products)
            // console.log("this is new data",newproductsdata.products[0]._id)
        } catch (error) {
          console.error("failed to fetech producys",error)
        //   alert("failed to fetch products")  
        }
    }

    useEffect(()=>{
        producthandler()
        
    },[])
    
    const deleteproductbyid = async(productId)=>{
       
        //  const response = await fetch(`${API_URL}product/${productId}`
        try {
            console.log("i am here")
                const data = await fetch(`${API_Path}product/${productId}`,
                    {
                    
                    method: 'DELETE'
                })
                
            if(data.ok){
                // confirm("are you sure, you want to delete?")
                alert("Product deleted Successfully")
                setProducts(products.filter(product =>product._id !== productId));
                
                
            }
         
        }
        
         catch (error) {
            console.log("this is my product id",productId)
            
            console.error(error);
            alert('Failed to delete product',error)
        }
}
  return (
    <div>
        {!products ?(
            <h1>No Products added</h1>
        ):(
            <table className="product-table">
                <thead>
                    <tr>
                        <th>productName</th>
                        <th>price</th>
                        <th>image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item)=>{
                        console.log("this is my item",item._id)
                     
                        return (
                            <>
                            <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>{item.image && (
                                    <img src={`${API_Path}uploads/${item.image}`} alt={item.productName} />
                                )}</td>
                                <td>
                                    <button onClick={()=>deleteproductbyid(item._id)}>Delete</button>
                                </td>
                            </tr>
                            </>
                        )
                    })}
                </tbody>
            </table>

        )}
    </div>
  )
}

export default AllProducts