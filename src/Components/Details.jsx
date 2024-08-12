import React, { useEffect, useRef, useState } from 'react'
import './Details.scss'
import { datefun, time } from '../lib/utils'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { LocationList, SpotList } from '../lib/Data';

export default function Details() {

    const isDisabled= ()=> {
        let values = formik.values.location && (formik.values.spot || formik.values.pspot) && formik.values.date && formik.values.time;
        // console.log( !values)
        return !values
    }

    const initialValues = {
        location:'--Select--',
        spot:'',
        pspot:'',
        date:null,
        time:null
    }

    const [display, setdisplay] = useState(false)

    // const onSubmit = (values) => {
    //     console.log("formik submit ",values)
    //     setdisplay(true)
    // }

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
        location: Yup.string().notOneOf(['--Select--'],'Select a Valid Option').required("Required"),
        spot: Yup.string(),
        pspot:Yup.string(),
        date : Yup.date().required("Required")
                  .test('is future','date is invalid',value => {
                    return value && new Date(value) > new Date();
                  }),
        time : Yup.string().required("Required")
    })
    .test(
        'spot-or-pspot',
        'Either Spot or Preferred Spot is required',
        function (values) {
            const { spot, pspot } = values;
            return spot || pspot;
        }
    );

    const formik = useFormik({
        initialValues,
        // onSubmit,
        onSubmit: (values) => {
            console.log("Formik submit", values);
            setdisplay(true);
        },
        validationSchema
    })

    
    let pspoterror = formik.touched.pspot && formik.values.pspot === "" ? "Required" : " ";

    const location = useRef(null)


    // useEffect(() => {
    //   location.current.focus()
    // }, [])


    // console.log("formik errors" , formik.errors)
    console.log("visited fields" , formik.touched)


  return (
    <div className='main_div'>
        <form className='form' 
        onSubmit={formik.handleSubmit}>
            <div>
                <label >Location:</label>
                <select ref={location} 
                name='location' 
                id='location' 
                // onChange={formik.handleChange} 
                // onBlur={formik.handleBlur}
                // value={formik.values.location}
                {...formik.getFieldProps('location')}>
                    <option>--Select--</option>
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
                        {...formik.getFieldProps('spot')}/>
                            <datalist id="branches">
                                {
                                    SpotList[formik.values.location].map( val => (
                                        <option>{val}</option>
                                    ))
                                }
                            </datalist>

                        {formik.touched.spot && formik.errors.spot ? <div>{formik.errors.spot}</div> : null}
                    </div> : ((formik.values.location != '--Select--')  && (<div>
                        <label htmlFor='pspot'>Preferred Spot :</label>
                        <input placeholder='Type your preferred spot'
                               name='pspot'
                               id='pspot'
                               {...formik.getFieldProps('pspot')}> 
                        </input>
                        {/* {formik.touched.pspot && formik.errors.pspot ? <div>{formik.errors.pspot}</div> : null} */}
                        <div>{pspoterror}</div>
                    </div>) 
                    )
                }
            

            <div>
                <label >Date:</label>
                <input 
                name='date' 
                type='date' 
                id='date' 
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
                {...formik.getFieldProps('time')}>
                </input>

                {formik.touched.time && formik.errors.time ? <div>{formik.errors.time}</div> : null}
            </div>
            <button className="button" type='submit' disabled={isDisabled()} >Submit</button>
        </form>
        <div>
        { display &&
           ( <p>I will be waiting in the {formik.values.location === 'none' ? formik.values.pspot : formik.values.location+'-'+formik.values.spot} on {datefun(formik.values.date)} at {time(formik.values.time)} sharp.!!</p>)
        }
        </div>
    </div>
  )
}