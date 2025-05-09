import {Playfair_Display} from "next/font/google";
import {Grid} from "antd-mobile";

const playfairDisplay = Playfair_Display({
    subsets: ["latin"],
    weight: '500',
});

export default function Header() {
    return (
        <header className='p-1.5 border-b border-gray-200'>
            <Grid columns={2} style={{alignItems: 'flex-end'}}>
                <Grid.Item className={`${playfairDisplay.className} text-3xl`}>MIZUNOWA</Grid.Item>
                <Grid.Item className={'text-right'}>
                    <small className={'text-gray-400'}>そっと支えて、ずっと寄り添う</small>
                </Grid.Item>
            </Grid>
        </header>
    )
}