
import React,{useState} from "react";
import { API_Path } from "../../Helpers/ApiPath";

const AddProduct = () => {
  const [productName,setproductName]=useState("")
  const [price,setprice]=useState("")
  const [category,setcategory]=useState([])
  const [bestseller,setbestceller]=useState(false)
  const [image,setimage]=useState(null)
  const [description,setdescription]=useState("")

  const handlecategorychange = (event) => {
    const value = event.target.value;
    if (category.includes(value)) {
      setcategory(category.filter((item) => item !== value))
    }
    else {
      setcategory([...category, value])
    }
  }

  const handlebestceller=(event)=>{
    const value = event.target.value ==="true"
    setbestceller(value)
  }
  const handleimageupload = (event) => {
    const selectedimage = event.target.files[0];
    setimage(selectedimage)
  }

  const handleaddproduct=async(e)=>{
    e.preventDefault()
    try {
      const logintoken=localStorage.getItem("logintoken")
      const firmid=localStorage.getItem("firmid")

if(!logintoken || !firmid){
console.error("user not authenticated")
alert("user not authenticated")
}
const formdata = new FormData();
      formdata.append("productName", productName);
      formdata.append("price", price);
      formdata.append("description", description);
      formdata.append("bestseller", bestseller);
      formdata.append("image", image);

      category.forEach((val) => {
        formdata.append("category", val)
      })

      const response=await fetch(`${API_Path}product/add-product/${firmid}`,{
        method:"POST",
        body:formdata
      })
      const data = await response.json();
      if(response.ok){
        alert("product added sucessfully")
      }
      setproductName("")
      setbestceller(false)
      setcategory([])
      setprice("")
      setimage(null)
      setdescription("")

    } catch (error) {
      console.error(data.message)
      alert("failed to add product")
    }
  }

  return (
    <div className="firmsection">
      <form className="tableform" onSubmit={handleaddproduct}>
        <h2>Add Product</h2>

        <label>Product Name</label>
        <input type="text"  value={productName} onChange={(e)=>setproductName(e.target.value)}/>

        <label>Price</label>
        <input type="text" value={price} onChange={(e)=>setprice(e.target.value)}/>

        {/* Category Checkboxes */}
        <div className="Checkinp">
          <label>Category</label>
          <div className="inputscontainer" >
            <div className="checkboxcontainer">
              <label>
                <input type="checkbox" value="veg" checked={category.includes("veg")} onChange={handlecategorychange}/> Veg
              </label>
            </div>
            <div className="checkboxcontainer">
              <label>
                <input type="checkbox" value="non-veg" checked={category.includes("non-veg")} onChange={handlecategorychange}/> Non-Veg
              </label>
            </div>
          </div>
        </div>

        {/* Bestseller Radio Buttons */}
        <div className="BestsellerInp">
          <label>Bestseller</label>
          <div className="radio-container">
            <div className="radio-container">
              <label>
                <input type="radio" name="bestseller" value="true" checked={bestseller===true} onChange={handlebestceller}/> Yes
              </label>
            </div>
            <div className="radio-container">
              <label>
                <input type="radio" name="bestseller" value="false" checked={bestseller===false} onChange={handlebestceller}/> No
              </label>
            </div>
          </div>
        </div>

        <label>Description</label>
        <input type="text" value={description}  onChange={(e)=>setdescription(e.target.value)}/>

        <label>Product Image</label>
        <input type="file"  onChange={handleimageupload}/><br />

        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;




