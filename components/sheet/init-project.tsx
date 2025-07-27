import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { useState } from 'react'

const InitProject = ({open, setOpen}: {open: boolean, setOpen: (open: boolean) => void}) => {
  return (
   <Sheet open={open} onOpenChange={setOpen}>
    <SheetContent side='bottom' className='bg-[#030303] border-[rgba(255,255,255,0.10)] rounded-t-[24px] mx-16 h-[800px]'>
        <SheetHeader>
            <SheetTitle>
                
            </SheetTitle>
        </SheetHeader>
    </SheetContent>
   </Sheet>
  )
}

export default InitProject
