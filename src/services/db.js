import {db} from "./firebase";

export function getProducts() {
    return db.ref("products").once('value');
}

const idGenerator = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export function placeOrder(order: Object, userId: string) {
    const orderId = idGenerator();
    return db.ref(`orders/${userId}/${orderId}`).update(order);
}

export function readChats() {
    let abc = [];
    db.ref("chats").on("value", snapshot => {
        snapshot.forEach(snap => {
            abc.push(snap.val())
        });
        return abc;
    });
}

export function writeChats(message) {
    return db.ref("chats").push({
        content: message.content,
        timestamp: message.timestamp,
        uid: message.uid
    });
}
