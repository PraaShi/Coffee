import React, { useEffect, useRef, useState } from 'react'
import './Details.scss'
import { datefun, time } from '../lib/utils'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { LocationList, SpotList } from '../lib/Data';

export default function Details() {


    const initialValues = {
        location:'',
        spot:'',
        pspot:'',
        date:null,
        time:null
    }

    const onSubmit = (values) => {
        console.log("formik submit ",values)
    }

    // const validate = (values) => {
    //     let errors = {}
    //     if(!values.location){
    //         errors.location = 'Required'
    //     }

    //     if(!values.spot){
    //         errors.spot = 'Required'
    //     }
        
    //     if(!values.date){
    //         errors.date = 'Required'
    //     }

    //     if(!values.time){
    //         errors.time = 'Required'
    //     }
    //     return errors
    // }

    const validationSchema = Yup.object({
        location: Yup.string().required("Required"),
        spot: Yup.string().required("Required"),
        spot:Yup.string(),
        date : Yup.date().required("Required")
                  .test('is future','date is invalid',value => {
                    return value && new Date(value) > new Date();
                  }),
        time : Yup.string().required("Required")
    })
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    const location = useRef(null)

    const [display, setdisplay] = useState(false)
    
    function handleonclick(e) {
        e.preventDefault();
        console.log(e)

        const form = e.target;
        const formData = new FormData(form);
        
        setinfo({
            location : formData.get('location'),
            spot : formData.get('spot'),
            date : formData.get('date'),
            time : formData.get('time')
        })

        setdisplay(true);
    }

    useEffect(() => {
      location.current.focus()
    }, [])


    // console.log("formik errors" , formik.errors)
    // console.log("visited fields" , formik.touched)

  return (
    <div className='main_div'>
        <form className='form' 
        // onSubmit={handleonclick} 
        onSubmit={formik.handleSubmit}
        >
            <div>
                <label >Location:</label>
                <select ref={location} 
                name='location' 
                id='location' 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                value={formik.values.location}>
                    <option>none</option>
                    <option>potheri</option>
                    <option>guduvanchery</option>
                    <option>TNagar</option>
                    <option>Tambaram</option>
                    <option>chrompet</option>
                    <option>chengalpattu</option>
                    <option>AnnaNagar</option>
                    <option>Thuraipakkam</option>
                </select>

                {formik.touched.location && formik.errors.location ? <div>{formik.errors.location}</div> : null}
            </div>

            
                {
                    LocationList.includes(formik.values.location) ?
                    <div>
                        <label htmlFor="spot">Spot:</label>
                        <input 
                        id="spot" 
                        name="spot" 
                        list="branches" 
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                        value={formik.values.spot}/>
                            <datalist id="branches">
                                {
                                    SpotList[formik.values.location].map( val => (
                                        <option>{val}</option>
                                    ))
                                }
                            </datalist>

                        {formik.touched.spot && formik.errors.spot ? <div>{formik.errors.spot}</div> : null}
                    </div> : <div>
                        <input placeholder='Type your prefered spot'
                               name='pspot'
                               onChange={formik.handleChange} 
                               onBlur={formik.handleBlur}
                               value={formik.values.pspot}> 
                        </input>
                    </div>
                }
            

            <div>
                <label >Date:</label>
                <input 
                name='date' 
                type='date' 
                id='date' 
                // onChange={formik.handleChange} 
                // onBlur={formik.handleBlur} 
                // value={formik.values.date}
                {...formik.getFieldProps('date')}
                ></input>

                {formik.touched.date && formik.errors.date ? <div>{formik.errors.date}</div> : null}
            </div>
            <div>
                <label >Time:</label>
                <input 
                name='time'
                type='time' 
                id='time' 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                value={formik.values.time}>
                </input>

                {formik.touched.time && formik.errors.time ? <div>{formik.errors.time}</div> : null}
            </div>
            <button className="button" type='submit' >Submit</button>
        </form>
        <div>
        { display &&
           ( <p>I will be waiting in the {info.location} on {datefun(info.date)} at {time(info.time)} sharp.!!</p>)
        }
        </div>
    </div>
  )
}
