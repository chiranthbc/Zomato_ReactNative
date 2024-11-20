import { View, Pressable, TextInput } from 'react-native'
import React, { FC } from 'react'
import { useStyles } from 'react-native-unistyles';
import { phoneStyles } from '@unistyles/phoneStyles';
import CustomText from '@components/global/CustomText';
import { Colors } from '@unistyles/Constants';
import Icon from '@components/global/Icon';



interface PhoneInputProps {
    value: string;
    onChangeText?: (text: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}


const Phoneinput: FC<PhoneInputProps> = ({ value, onChangeText, onBlur, onFocus }) => {
    const { styles } = useStyles(phoneStyles);
    return (
        <View style={styles.container}>
            <Pressable style={styles.countryPickerContainer}>
                <CustomText variant='h2'>🏳️‍⚧️</CustomText>
                <Icon name='caret-down-sharp' iconFamily='Ionicons' size={18} color={Colors.lightText} />
            </Pressable>
            <View style={styles.phoneInputContainer}>
                <CustomText fontFamily='Okra-Bold'>+91</CustomText>
                <TextInput
                    placeholder='Enter Mobile Number'
                    keyboardType='phone-pad'
                    value={value}
                    placeholderTextColor={Colors.lightText}
                    onChangeText={onChangeText}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    style={styles.input}
                />



            </View>
        </View>
    )
}

export default Phoneinput