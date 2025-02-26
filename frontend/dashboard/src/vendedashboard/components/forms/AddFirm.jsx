import React, { useState } from 'react'
// import { API_Path } from "../../Helpers/ApiPath";
import { API_Path } from "../../Helpers/ApiPath"

const AddFirm = () => {
  const [firmname, setfirmname] = useState("")
  const [area, setarea] = useState("")
  const [Category, setcategory] = useState([])
  const [region, setregion] = useState([])
  const [offer, setoffer] = useState("")
  const [file, setfile] = useState(null)
 

  const handlecategorychange = (event) => {
    const value = event.target.value;
    if (Category.includes(value)) {
      setcategory(Category.filter((item) => item !== value))
    }
    else {
      setcategory([...Category, value])
    }
  }

  const handleregionchange = (event) => {
    const value = event.target.value;
    if (region.includes(value)) {
      setregion(region.filter((item) => item !== value))
    }
    else {
      setregion([...region, value])
    }
  }


  const handleimageupload = (event) => {
    const selectedimage = event.target.files[0];
    setfile(selectedimage)
  }






  const handlefirmsubmit = async (e) => {
    e.preventDefault();
    try {
      // getting token from local storage(we already strored the token in local storage in login section)
      const logintoken = localStorage.getItem("logintoken")
      // here we are storing the token in logintoken variable

      console.log(logintoken)

      if (!logintoken) {
        console.error("user not authenticated")
      }

      const formdata = new FormData();
      formdata.append("firmname", firmname);
      formdata.append("area", area);
      formdata.append("offer", offer);
      formdata.append("image", file);

      Category.forEach((val) => {
        formdata.append("category", val)
      })

      region.forEach((value) => {
        formdata.append("region", value)
      })
      const response = await fetch(`${API_Path}firm/add-firm`, {
        method: "POST",
        headers: {
          "token": `${logintoken}`,
        },
        body: formdata,
      });
      const data = await response.json()
      console.log("this is data", data)
      if (response.ok) {

        setfirmname("")
        setarea("")
        setcategory([])
        setregion([])
        setoffer("")
        setfile(null)
        alert("firm added sucessfully")
      }
      // this data came from back end. this is used for only one vender have only firm it will not accept more then one firm to the one vender
      else if (data.message === "vendor can have only one firm") {
        alert("firm exists only 1 firm can be added")
      } else {
        alert("failed to add firm")
      }
      console.log("this is firm id", data.firmid)
      const firmid = data.firmid;
      localStorage.setItem("firmid", firmid)

    } 
   
    catch (error) {
      console.error("failed to add firm")
      alert("failed to add firm")
      
    }
  }
  return (
    <div className="firmsection">

      <form
        className="tableform" onSubmit={handlefirmsubmit}>
        <h2>Add Firm</h2>
        <label>Firm Name</label>
        <input type="text" name="firmname" value={firmname} onChange={(e) => setfirmname(e.target.value)} />
        <label>Area</label>
        <input type="text" name="area" value={area} onChange={(e) => setarea(e.target.value)} />
        {/* <label>Category</label>
        <input type="text" /> */}
        <div className="Checkinp">
          <label >Category</label>
          <div className="inputscontainer">
            <div className="checkboxcontainer">
              <label>Veg</label>
              <input type="checkbox" checked={Category.includes("veg")} value="veg" onChange={handlecategorychange} />
            </div>
            <div className="checkboxcontainer">
              <label>Non-Veg</label>
              <input type="checkbox" checked={Category.includes("non-veg")} value="non-veg" onChange={handlecategorychange} />
            </div>
          </div>
        </div>

        {/* <label>Region</label>
        <input type="text" /> */}
        <div className="Checkreginp">
          <label >Region</label>
          <div className="inputsregcontainer">
            <div className="checkboxregcontainer">
              <label>South-Indian</label>
              <input type="checkbox" value="south indian" checked={region.includes("south indian")} onChange={handleregionchange} />
            </div>
            <div className="checkboxregcontainer">
              <label>North-Indian</label>
              <input type="checkbox" value="north indian" checked={region.includes("north indian")} onChange={handleregionchange} />
            </div>
            <div className="checkboxregcontainer">
              <label>Chinese</label>
              <input type="checkbox" value="chinese" checked={region.includes("chinese")} onChange={handleregionchange} />
            </div>
            <div className="checkboxregcontainer">
              <label>Backery</label>
              <input type="checkbox" value="bakery" checked={region.includes("bakery")} onChange={handleregionchange} />
            </div>
          </div>
        </div>

        <label>Offer</label>
        <input type="text" name='offer' value={offer} onChange={(e) => setoffer(e.target.value)} />
        <label>Firm Image</label>
        <input type="file"   onChange={handleimageupload} /><br />

        <div className="btnSubmit">
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddFirm