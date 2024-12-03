import { toast, type ToastOptions } from "vue3-toastify";
import '@assets/styles/_notyf.scss'


export function successAlert(message: string){ 
    toast(message, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        theme: toast.THEME.DARK,
        type: toast.TYPE.SUCCESS,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        transition: toast.TRANSITIONS.SLIDE
    } as ToastOptions);
}
export function warningAlert(message: string){ 
    toast(message, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        theme: toast.THEME.DARK,
        type: toast.TYPE.WARNING,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        transition: toast.TRANSITIONS.SLIDE
    } as ToastOptions);
}
export function errorAlert(message: string){ 
    toast(message, {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        theme: toast.THEME.DARK,
        type: toast.TYPE.ERROR,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        transition: toast.TRANSITIONS.SLIDE
    } as ToastOptions);
}

export async function promiseAlert(
    promise: any,
    pending: string,
    success: string,
    error: string,
) {
    var promiseResponse
    const wrappedPromise = new Promise((resolve, reject) => {
        promise
        .then((response: any) => {
            promiseResponse = response.data
            setTimeout(resolve, 500)
        })
        .catch(() => {
            setTimeout(reject, 500)
        }); 
    });
    await toast.promise(
        wrappedPromise,
        {
            pending: pending,
            success: success,
            error: error,
        },
        {
            closeButton: false,
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT,
            theme: toast.THEME.DARK,
            pauseOnHover: false,
            pauseOnFocusLoss: false,
            transition: toast.TRANSITIONS.SLIDE,
        }
    );

    return promiseResponse as any
}

