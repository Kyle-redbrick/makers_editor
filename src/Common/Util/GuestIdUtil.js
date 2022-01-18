import uuidv4 from "uuid/v4";

const generateGuestId = () => {
    const uuid = uuidv4();
    // android:1, ios:2, web:3
    const guestId = "guest_3" + uuid.substring(0, 8);
    return guestId;
};

export const getGuestId = () => {
    let guestId = localStorage.getItem("GUESTID");
    if (!guestId) {
        guestId = generateGuestId();
        localStorage.setItem("GUESTID", guestId);
    }
    return guestId;
};