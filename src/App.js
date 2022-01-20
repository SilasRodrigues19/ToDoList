import {
  Flex,
  Text,
  Input,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Checkbox,
  IconButton,
  createStandaloneToast,
} from '@chakra-ui/react';

import { DeleteIcon, SmallAddIcon } from '@chakra-ui/icons';

import { useState, useEffect } from 'react';

const toast = createStandaloneToast()

const App = () => {

  const getLocalStorage = () => {
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
      return (tasks = JSON.parse(localStorage.getItem('tasks')))
    }
    return [];
  }

  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState(getLocalStorage());

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  const addTask = e => {
    e.preventDefault();
    if (newTask.length > 0) {
      toast({
        title: 'Success.',
        description: 'Task added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
      setTasks(prevState => [
        ...prevState,
        { text: newTask, newTask, isChecked: false }
      ])
      setNewTask('')
      return;
    }
    toast({
      title: 'Error.',
      description: 'Task cannot be empty.',
      status: 'warning',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    })
  }

  const updateTask = (index, checked) => {
    let newTasks = [...tasks]
    newTasks[index].isChecked = checked
    setTasks(newTasks)
    if (newTasks[index].isChecked = checked) {
      toast({
        title: 'Marked as done.',
        description: 'Task marked as done.',
        status: 'info',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })
      return;
    }
    toast({
      title: 'Unmarked as done.',
      description: 'Task unmarked as done.',
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    })
  }

  const removeTask = index => {
    toast({
      title: 'Deleted.',
      description: 'Task deleted successfully.',
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    })

    const newTasks = [...tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
  }

  return (
    <>
      <Flex w='100%' h="100vh">
        <Flex justify='center' align='center' flexDir='column' w='100%' maxW='70%' m='0 auto' color='#fff'>
          <Text fontWeight='700' textAlign='center' mb='10%' fontSize={30}
            sx={{
              '@media screen and (max-width: 500px)': {
                fontSize: '20px',
              },
            }}>
            What's the Plan for Today?
          </Text>
          <form onSubmit={addTask}>
            <Flex mt='2%'
              sx={{
                '@media screen and (max-width: 500px)': {
                  marginBottom: '30px',
                },
              }}
            >
              <Input
                value={newTask} onChange={e => setNewTask(e.target.value)} css={{
                  '&:focus::-webkit-input-placeholder': {
                    marginRight: '30rem',
                    transition: 'margin-right ease-in-out 2.5s',
                  },
                  '::-webkit-input-placeholder': {
                    transition: 'margin-right ease-in-out 1.5s',
                  },
                }} focusBorderColor='purple.400' variant='outline' w='50%' placeholder='Task to be done'
                sx={{
                  '@media screen and (max-width: 500px)': {
                    w: '60%',
                  },
                }}
              />
              <Button onClick={addTask} ml={5} bgGradient='linear(to-l, #647dee, #7f53ac)' _hover={{ bgGradient: 'linear(to-r, #647dee, #7f53ac)', }} _focus={{ boxShadow: 'none' }}><SmallAddIcon w={5} h={5} /></Button>
            </Flex>
          </form>
          <Tabs mt='2%' w='100%'>
            <TabList >
              <Tab _focus='none' color='purple.200' _selected={{ color: 'purple.400', borderColor: 'purple.400' }}>Incomplete</Tab>
              <Tab _focus='none' color='purple.200' _selected={{ color: 'purple.400', borderColor: 'purple.400' }}>Completed</Tab>
            </TabList>
            <TabPanels maxH='400px' overflowY='scroll'
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255, 255, 255, 0.16)',
                },
              }}>
              <TabPanel>
                {tasks.map((task, index) => (
                  !task.isChecked ? <TaskItem removeTask={removeTask} updateTask={updateTask} key={index} task={task} index={index} /> : null
                ))}
              </TabPanel>
              <TabPanel>
                {tasks.map((task, index) => (
                  task.isChecked ? <TaskItem removeTask={removeTask} updateTask={updateTask} key={index} task={task} index={index} /> : null
                ))}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex >
    </>
  )
}

const TaskItem = ({ task, index, updateTask, removeTask }) => {
  return (
    <Checkbox onChange={e => updateTask(index, e.target.checked)} flexDir='row' colorScheme='purple' mb={10} w='100%' isChecked={task.isChecked}>
      <Flex w='100%' flexDir='row'>
        <Text color='#fff' alignSelf='center'>{task.text}</Text>
        <IconButton onClick={() => removeTask(index)} bg='purple.600' bgGradient='linear(to-l, #647dee, #7f53ac)' _hover={{ bgGradient: 'linear(to-r, #647dee, #7f53ac)', }} pos='absolute' right={0} icon={
          <DeleteIcon
            sx={{
              '@media screen and (max-width: 500px)': {
                h: '14px',
              },
            }}
          />}
          sx={{
            '@media screen and (max-width: 500px)': {
              h: '28px',
            },
          }} />
      </Flex>
    </Checkbox>
  )
}

export default App