/* ==========================================================================
   CHEM THCS - Roles & Authentication Module
   ========================================================================== */

const RoleManager = (() => {
    const ROLE_KEY = 'chemthcs_role';
    const OTP_KEY  = 'chemthcs_otp_pending';
    const OWNER_EMAIL = 'huynhtrikien11@gmail.com';

    // EmailJS credentials (public – safe to embed in client JS)
    // Service: Gmail via EmailJS
    const EMAILJS_SERVICE_ID  = 'service_chemthcs';
    const EMAILJS_TEMPLATE_ID = 'template_otp_chemthcs';
    const EMAILJS_PUBLIC_KEY  = 'YOUR_EMAILJS_PUBLIC_KEY'; // filled after setup

    /* ---- Role helpers ---- */
    function getRole() {
        return sessionStorage.getItem(ROLE_KEY) || null;
    }

    function setRole(role) {
        sessionStorage.setItem(ROLE_KEY, role);
    }

    function clearRole() {
        sessionStorage.removeItem(ROLE_KEY);
        sessionStorage.removeItem(OTP_KEY);
    }

    function isOwner()   { return getRole() === 'owner';   }
    function isTeacher() { return getRole() === 'teacher';  }
    function isStudent() { return getRole() === 'student';  }

    function canEdit()   { return isOwner() || isTeacher(); }

    /* ---- OTP helpers ---- */
    function generateOTP() {
        return String(Math.floor(100000 + Math.random() * 900000));
    }

    function storeOTP(otp) {
        const expires = Date.now() + 10 * 60 * 1000; // 10 phút
        sessionStorage.setItem(OTP_KEY, JSON.stringify({ otp, expires }));
    }

    function verifyOTP(input) {
        const raw = sessionStorage.getItem(OTP_KEY);
        if (!raw) return { ok: false, msg: 'Chưa có mã OTP. Vui lòng yêu cầu gửi lại.' };
        const { otp, expires } = JSON.parse(raw);
        if (Date.now() > expires) {
            sessionStorage.removeItem(OTP_KEY);
            return { ok: false, msg: 'Mã OTP đã hết hạn (10 phút). Vui lòng gửi lại.' };
        }
        if (String(input).trim() === String(otp).trim()) {
            sessionStorage.removeItem(OTP_KEY);
            return { ok: true };
        }
        return { ok: false, msg: 'Mã OTP không đúng. Vui lòng kiểm tra lại email.' };
    }

    /* ---- Send OTP via EmailJS ---- */
    async function sendOTP() {
        const otp = generateOTP();
        storeOTP(otp);

        // Try EmailJS if available
        if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY') {
            try {
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                    to_email: OWNER_EMAIL,
                    otp_code: otp,
                    time_limit: '10 phút'
                }, EMAILJS_PUBLIC_KEY);
                return { ok: true, msg: 'Mã OTP đã được gửi đến ' + OWNER_EMAIL };
            } catch (err) {
                console.error('EmailJS error:', err);
                // fallback: hiển thị OTP trong console (dev mode)
                console.warn('DEV MODE - OTP:', otp);
                return { ok: true, msg: 'Mã OTP đã được tạo. Kiểm tra email hoặc xem Console (F12) để lấy mã (DEV).' };
            }
        } else {
            // Dev fallback – hiển thị OTP ngay trên màn hình (chỉ khi chưa cấu hình EmailJS)
            console.warn('EmailJS chưa cấu hình – OTP (DEV):', otp);
            return {
                ok: true,
                devOtp: otp,
                msg: 'EmailJS chưa cấu hình. Mã OTP DEV: ' + otp + ' (sẽ ẩn sau khi cấu hình EmailJS).'
            };
        }
    }

    return { getRole, setRole, clearRole, isOwner, isTeacher, isStudent, canEdit, sendOTP, verifyOTP, OWNER_EMAIL };
})();
