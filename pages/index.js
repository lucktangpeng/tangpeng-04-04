import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { 
  Box,
  Img,
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { FaSistrix, FaMicrophone } from "react-icons/fa";
import React ,{ useState,useRef } from 'react'
import styled from "@emotion/styled"


const RoundIcon = styled.div({
  borderRadius: '50%',
  backgroundColor: '#999',
  width: 60,
  height: 60,
  display: "flex",
  justifyContent: 'center',
  alignItems: 'center'
})

const IconsWrap = styled.div({
  display: "flex",
  flexWrap: "wrap",
})

function TestDiv () {
  console.log('TestDiv')
  return (
    <div>
      div
    </div>
  )
}

export default function Home() {
  const [iconsList, setIconsList] = useState([])
  const [isOpen, setIsOpen] = React.useState(true)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  const name = useRef()
  const address = useRef()
  const nameHandle = () => {
    console.dir(name.current.value)
  }
  const addressHandle = () => {
    console.dir(address.current.value)
  }
  const commit = () => {
    setIconsList(
      [...iconsList, {
        icons: name.current.value,
        address: address.current.value
      }]
    )
    console.log(iconsList)
    setIsOpen(false)
  }
  return (
    <Box w="500px" mx="auto" mt="200px">
      <Stack textAlign="center" spacing="30px">
        <Box><Img src="/logo.svg" mx="auto" /></Box>
        <Box>
          <InputGroup>
            <InputLeftElement ml="5px" children={<FaSistrix/>}></InputLeftElement>
            <Input placeholder="在Google 上搜索, 或者输入一个网址" shadow="base" borderRadius="20px"></Input>
            <InputRightElement mr="5px" children={<FaMicrophone/>}></InputRightElement>
          </InputGroup>
        </Box>
        <Box>
          <IconsWrap>
            { iconsList.map(icon => {
              return(
                <Box as="a" key={icon.address} href={icon.address}>
                  <RoundIcon>{icon.icons}</RoundIcon>
                  <Text fontSize="12px">{icon.icons}</Text>
                </Box>
              )
            })
            }
            <Box onClick={() => {setIsOpen(!isOpen)}}>
              <RoundIcon>+</RoundIcon>
              {/* <Text>123</Text> */}
            </Box>
          </IconsWrap>
          {/* { dialogStatus ? <TestDiv/>: ''} */}
        </Box>
      </Stack>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              添加快捷方式
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl id="first-name">
                <FormLabel>名称</FormLabel>
                <Input ref={name} onChange={nameHandle} />
              </FormControl>
              <FormControl id="网址">
                <FormLabel>网址</FormLabel>
                <Input placeholder="http://www.baidu.com 需添加http://" ref={address} onChange={addressHandle} />
              </FormControl>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                取消
              </Button>
              <Button colorScheme="red" onClick={commit} ml={3}>
                确定
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
    
  )
}
