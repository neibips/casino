import {toast} from "react-toastify";


const sendF = async (e, base58, publicKey) => {
    e.preventDefault()
    if (e.target[0].value !== ''){
        if (!publicKey) {
            const notify = () => toast("Connect your wallet first");
            return notify()
        }
        socket.emit('chat message', {
            text: e.target[0].value,
            wallet: base58
        });
        e.target[0].value = ''
    }else{
        const notify = () => toast("You cant send empty string");
        return notify()
    }
}
export default sendF();
