import { Button, createStyles, Grid, Group, Stack, Text, Title } from '@mantine/core'
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { useEffect, useRef, useState } from 'react'
import { FaUpload, FaDownload, FaTrash } from 'react-icons/fa';
import { AvatarCard } from '../elements/AvatarCard';
import { DropZone } from '../elements/DropZone';

const FilesAPI = {
    all: async () =>
        await (await fetch(`/api/files`)).json(),

    create: async (files: FileWithPath[]) => {
        const formData =  new FormData();
        formData.append('file', files[0])
        await fetch('/api/files', {
            method: 'POST',
            body:formData,
        })
    },

    delete: async (id: number) =>
        await fetch(`/api/files/${id}`, { method: 'DELETE' })
}

const useStyles = createStyles((theme) => ({
    wrapper: {
      position: 'relative',
      marginBottom: 30,
    },
  
    dropzone: {
      borderWidth: 1,
      paddingBottom: 50,
    },
  
    icon: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
    },
  
    control: {
      width: 250,
    },
}));

export const Files = () => {
    const [files, setFiles] = useState<FileInfo[]>([])
    const [processing, setProcessing] = useState<boolean>(false)

    const createFile = async (files: FileWithPath[]) => {
        setProcessing(true)
        await FilesAPI.create(files)
        setFiles(await FilesAPI.all())
        const el = document.getElementById("file")! as HTMLInputElement
        el.value = ''
        setProcessing(false)
    }

    const deleteFile = async (file: FileInfo) => {
        setProcessing(true)
        await FilesAPI.delete(file.id)
        setFiles(await FilesAPI.all())
        setProcessing(false)
    }

    const { classes } = useStyles();
    const openRef = useRef<() => void>(null);
    
    useEffect(() => {
        setProcessing(true)
        FilesAPI.all().then((files) => {
            setFiles(files)
            setProcessing(false)
        })
    }, [])

    return (
        <Stack sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] })}>
            <Title order={1} mb={4}>Your avatars</Title>

            <Grid gutter={10}>
                <Grid.Col span={4}>
                    <DropZone createFile={(files: FileWithPath[]) => createFile(files)}></DropZone>
                </Grid.Col>
                {files.map((file, index) => (
                    <Grid.Col md={4} lg={2}>
                        <AvatarCard
                            name={file.name} 
                            url={file.url || ''} 
                            isDefault={index!=1}
                            className={index==1 ? 'rainbow' : ''}></AvatarCard>
                    </Grid.Col>
                ))}
            </Grid>
        </Stack>
    )
}