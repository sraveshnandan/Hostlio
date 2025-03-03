import { View, Text, Modal, StyleSheet, TouchableOpacity, TextStyle, ScrollView } from 'react-native'
import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { hp } from '@/constants'

type Props = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
    title: string,
    titleStyle?: TextStyle,
    onSubmit?: (value: any) => void,
    onCancle?: (value: any) => void,
    ModalBody: ReactNode
}

const FilterModal = ({ isOpen, setIsOpen, title, titleStyle, ModalBody, onCancle, onSubmit }: Props) => {
    const [isopen, setIsopen] = useState(isOpen);


    const handlemodalClose = () => {
        setIsOpen(false);
        return setIsOpen(false)
    }



    return (
        <Modal
            visible={isopen}
            animationType="slide"
            transparent={true}
            onRequestClose={() => handlemodalClose()}
            hardwareAccelerated={true}
        >
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPressOut={() => handlemodalClose()}
            >
                {/* modal body  */}
                <View style={styles.modalContainer}>
                    <View className=' flex-row items-center justify-center'>
                        <Text className='text-center  w-8 h-2 rounded-full  bg-gray-200 '></Text>
                    </View>
                    <View className='flex-row items-center justify-between'>
                        <Text style={titleStyle}>{title}</Text>
                    </View>

                    {/* modal body  */}
                    <ScrollView className='flex-1'>
                        {ModalBody}
                    </ScrollView>

                    {
                        onSubmit && (
                            <View className=' w-full flex-row items-center justify-between'>

                            </View>
                        )
                    }

                </View>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        height: hp(75),
        maxHeight: hp(75), // Half the screen height
    },
})

export default FilterModal
