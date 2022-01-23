import { Icon } from '@chakra-ui/react';


const BinIcon = (props) => (
    <Icon viewBox='-5 -5 32 34' {...props}>
        <g id="bin" fill="currentColor">
            <path id="lid" d="M21 4H16.25C16.1837 4 16.1201 3.97366 16.0732 3.92678C16.0263 3.87989 16 3.8163 16 3.75V2.5C16 1.83696 15.7366 1.20107 15.2678 0.732233C14.7989 0.263392 14.163 0 13.5 0L8.5 0C7.83696 0 7.20107 0.263392 6.73223 0.732233C6.26339 1.20107 6 1.83696 6 2.5V3.75C6 3.8163 5.97366 3.87989 5.92678 3.92678C5.87989 3.97366 5.8163 4 5.75 4H1C0.734784 4 0.48043 4.10536 0.292893 4.29289C0.105357 4.48043 0 4.73478 0 5C0 5.26522 0.105357 5.51957 0.292893 5.70711C0.48043 5.89464 0.734784 6 1 6H21C21.2652 6 21.5196 5.89464 21.7071 5.70711C21.8946 5.51957 22 5.26522 22 5C22 4.73478 21.8946 4.48043 21.7071 4.29289C21.5196 4.10536 21.2652 4 21 4ZM8 3.75V2.5C8 2.36739 8.05268 2.24021 8.14645 2.14645C8.24021 2.05268 8.36739 2 8.5 2H13.5C13.6326 2 13.7598 2.05268 13.8536 2.14645C13.9473 2.24021 14 2.36739 14 2.5V3.75C14 3.8163 13.9737 3.87989 13.9268 3.92678C13.8799 3.97366 13.8163 4 13.75 4H8.25C8.1837 4 8.12011 3.97366 8.07322 3.92678C8.02634 3.87989 8 3.8163 8 3.75Z"/>
            <path id="container" d="M18.452 7.5H3.547C3.47737 7.49972 3.40845 7.51398 3.34466 7.54187C3.28087 7.56977 3.2236 7.61068 3.17653 7.66198C3.12946 7.71329 3.09363 7.77386 3.07132 7.83981C3.04902 7.90577 3.04073 7.97566 3.047 8.045L4.334 22.181C4.37917 22.6781 4.60858 23.1403 4.97716 23.4769C5.34575 23.8135 5.82686 24.0001 6.326 24H15.673C16.1721 24.0001 16.6532 23.8135 17.0218 23.4769C17.3904 23.1403 17.6198 22.6781 17.665 22.181L18.95 8.045C18.9562 7.97586 18.9479 7.90619 18.9257 7.84042C18.9035 7.77465 18.8678 7.71423 18.821 7.663C18.7742 7.61169 18.7172 7.5707 18.6537 7.54264C18.5901 7.51457 18.5215 7.50005 18.452 7.5ZM9.252 20.5C9.252 20.6989 9.17298 20.8897 9.03233 21.0303C8.89168 21.171 8.70091 21.25 8.502 21.25C8.30308 21.25 8.11232 21.171 7.97167 21.0303C7.83102 20.8897 7.752 20.6989 7.752 20.5V11.5C7.752 11.3011 7.83102 11.1103 7.97167 10.9697C8.11232 10.829 8.30308 10.75 8.502 10.75C8.70091 10.75 8.89168 10.829 9.03233 10.9697C9.17298 11.1103 9.252 11.3011 9.252 11.5V20.5ZM14.252 20.5C14.252 20.6989 14.173 20.8897 14.0323 21.0303C13.8917 21.171 13.7009 21.25 13.502 21.25C13.3031 21.25 13.1123 21.171 12.9717 21.0303C12.831 20.8897 12.752 20.6989 12.752 20.5V11.5C12.752 11.3011 12.831 11.1103 12.9717 10.9697C13.1123 10.829 13.3031 10.75 13.502 10.75C13.7009 10.75 13.8917 10.829 14.0323 10.9697C14.173 11.1103 14.252 11.3011 14.252 11.5V20.5Z"/>
        </g>
    </Icon>
)

const AddIcon = (props) => (
    <Icon viewBox='0 0 14 14' {...props}>
        <g id="plus" fill="currentColor">
            <path id="vertical" d="M6 14V0H8V14H6Z"/>
            <path id="horizontal" d="M14 8V6H0V8H14Z"/>
        </g>
    </Icon>
)

export { BinIcon };
export { AddIcon };