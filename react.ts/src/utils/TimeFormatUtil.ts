function formatTime(timeSeconds: number): string {
    const hours = Math.floor(timeSeconds / 3600);
    const minutes = Math.floor((timeSeconds % 3600) / 60);
    const seconds = Math.floor(timeSeconds % 60);
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    }
}


export default formatTime