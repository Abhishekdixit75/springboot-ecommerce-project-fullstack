export const truncateText = (text, charLimit = 90) => {
    if(text?.length > charLimit){
        return text.slice(0, charLimit+3) + '...';
    }
    return text;
};