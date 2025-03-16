import React, { ReactNode, useRef, useState } from 'react';
import { View, Button } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { hp, wp } from '@/constants';

type Props = {
    modelContents: ReactNode,
    snapPoints?: string[]
    handleOpenBox?: (ref: any) => void
}

const BottomSheetComponent = ({ modelContents, snapPoints = ["50%", "75%"], handleOpenBox }: Props) => {
    const [modelOpen, setmodelOpen] = useState(false)
    const bottomSheetRef = useRef<any>(null);
    // actions 
    const handleOpen = (bottomSheetRef: any) => {
        bottomSheetRef.current?.expand();
    };

    const handleClose = () => {
        bottomSheetRef.current?.close();
    };
    return (
        <View style={{ flex: 1, height: hp(100), position: "absolute", width: wp(100) }}>

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                keyboardBehavior='fillParent'
            >
                <View style={{ flex: 1 }}>
                    {modelContents}
                </View>
            </BottomSheet>
        </View>
    );
};


export default BottomSheetComponent;
