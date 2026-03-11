export const truncateText = (text, charLimit) => {
    if(text?.length > charLimit){
        return text.slice(0, charLimit+3) + '...';
    }
    return text;
};