import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Step from '@material-ui/core/Step';
import StepButton from "@material-ui/core/StepButton"
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import bible from "util/Bible";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export default function SelectChapterDialog({ open, onClose }: { open: boolean, onClose: () => any }) {
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const [selectedBook, setSelectedBook] = useState<string | null>(null);

    const bookStep = (_book: string) => {
        setSelectedBook(_book);
        setActiveStep(1);
    }

    const chapterStep = (link: string) => {
        onClose();
        setSelectedBook(null);
        setActiveStep(0);
        history.push(link);
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <Stepper activeStep={activeStep}>

                    <Step>
                        <StepButton onClick={() => setActiveStep(0)}>Book</StepButton>
                    </Step>

                    <Step>
                        <StepLabel>Chapter</StepLabel>
                    </Step>

                </Stepper>

                {activeStep === 0 &&
                    <List>
                        {bible
                            ._books
                            .map(_book => bible.books[_book])
                            .map((book) => (
                                <ListItem key={book._book} button onClick={() => bookStep(book._book)}>
                                    <ListItemText>{book.formattedBook}</ListItemText>
                                </ListItem>
                            ))}
                    </List>
                }
                {activeStep === 1 && selectedBook &&
                    <List>
                        {bible.books[selectedBook].chapters.map(chapter => (
                            <ListItem button key={chapter._chapter} onClick={() => chapterStep(chapter.link)}>
                                <ListItemText>{chapter.formattedBook} {chapter._chapter}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                }
            </DialogContent>
        </Dialog>
    );
}