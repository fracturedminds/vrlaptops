import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import faqData from '../data/faq.json';
import '../css/faq.css';

export default function Faq() {
    return (
        <div className="faq-container">
            <Typography variant="h4" className="faq-title">
                Frequently Asked Questions
            </Typography>
            {faqData.map((item, index) => (
                <Accordion key={index} className="faq-accordion">
                    <AccordionSummary
                        expandIcon={
                            <div className="faq-icon">
                                <AddIcon />
                            </div>}
                        aria-controls={`panel${index + 1}-content`}
                        id={`panel${index + 1}-header`}
                    >
                        <Typography component="span" className="faq-question">{item.question}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Typography className="faq-answer">{item.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}