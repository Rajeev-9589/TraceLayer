export default function getClientIP(req){
    const forwarded = req.headers['x-forwarded-for'];
    if(forwarded){
        return forwarded.split(',')[0].trim();
    }
    return req.socket?.remoteAddress || 'unknown';
}