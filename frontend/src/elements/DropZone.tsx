import { createStyles, Group, Stack, Text } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { useRef } from "react";
import { FaDownload, FaTrash, FaUpload } from "react-icons/fa";

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

interface DropZoneProps {
    createFile?: CallableFunction;
}

export const DropZone = ({ createFile }: DropZoneProps) => {
    const { classes, theme } = useStyles();
    const openRef = useRef<() => void>(null);

    return (
        <Stack sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] })}>
            <Dropzone
                openRef={openRef}
                onDrop={(form) => createFile && createFile(form)}
                className={classes.dropzone}
                radius="md"
                accept={[MIME_TYPES.png]}
                maxSize={30 * 1024 ** 2}
                h={375}
                >
                <div style={{ pointerEvents: 'none' }}>
                    <Group position="center" mt={50}>
                        <Dropzone.Accept>
                            <FaDownload size={50} color={theme.colors[theme.primaryColor][6]} />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <FaTrash size={50} color={theme.colors.red[6]} />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <FaUpload
                                size={50}
                                color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                            />
                        </Dropzone.Idle>
                    </Group>

                    <Text align="center" weight={700} size="lg" mt="xl">
                        <Dropzone.Accept>Drop files here, png file less than 30mb</Dropzone.Accept>
                        <Dropzone.Idle>Upload a new image</Dropzone.Idle>
                    </Text>
                    <Text align="center" size="sm" mt="xl" color="dimmed">
                        Drag&apos;n&apos;drop files here to upload. We can accept only <i>.png</i> files that
                        are less than 30mb in size.
                    </Text>
                </div>
            </Dropzone>
    </Stack>)
}