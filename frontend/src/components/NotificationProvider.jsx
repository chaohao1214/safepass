import { Alert, Snackbar } from '@mui/material'
import React, { createContext, useContext, useState } from 'react'

const NotificationContext =createContext();

export const NotificationProvider =({children}) =>{
    const [notification, setNotification] = useState({
        open: false,
        message: "",
        type:'success'
    })

    const successMessage = (message) => {
        setNotification({open:true, message, type:"success"})
    }

    const errorMessage = (message) => {
        setNotification({open:true, message, type:"error"})
    }

    const handleClose = () => {
        setNotification({...notification, open:false})
    }

    return (
        <NotificationContext.Provider value={{successMessage, errorMessage}}>
            {children}
            <Snackbar open={notification.open} autoHideDuration={5000} anchorOrigin={{vertical:'top', horizontal:'center'}} onClose={handleClose} >
                <Alert onClose={handleClose} security={notification.type} sx={{width:'100%'}} variant='filled'></Alert>
            </Snackbar>
        </NotificationContext.Provider>
    )
}

export const useNotification = () =>{useContext(NotificationContext)}