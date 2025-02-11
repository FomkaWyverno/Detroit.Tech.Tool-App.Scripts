import { LocalizationFragments } from '../../../../src/models/localization/fragments/LocalizationFragments';

describe('LocalizaionFragments', () => {
    test('Plain text', () => {
        const fragments = new LocalizationFragments('This is first text');
        expect(fragments.prefixes).toEqual(['']);
        expect(fragments.texts).toEqual(['This is first text']);
    });
    test('Plain text with space start', () => {
        const fragments = new LocalizationFragments('  This is first text');
        expect(fragments.texts).toEqual(['This is first text']);
        expect(fragments.prefixes).toEqual(['\\S\\S']);
    });
    test('Start one QD prefix', () => {
        const fragments = new LocalizationFragments('<QD_NORMAL>UNCOMFORTABLE');
        expect(fragments.prefixes).toEqual(['<QD_NORMAL>']);
        expect(fragments.texts).toEqual(['UNCOMFORTABLE']);
    });
    test('End one QD prefix', () => {
        const fragments = new LocalizationFragments('UNCOMFORTABLE<QD_NORMAL>');
        expect(fragments.prefixes).toEqual(['']);
        expect(fragments.suffix).toEqual('<QD_NORMAL>');
        expect(fragments.texts).toEqual(['UNCOMFORTABLE']);
    });
    test('In text one QD prefix', () => {
        const fragments = new LocalizationFragments('UNCOMFORTABLE<QD_THIN> BUT');
        expect(fragments.prefixes).toEqual(['','<QD_THIN>\\S']);
        expect(fragments.texts).toEqual(['UNCOMFORTABLE', 'BUT']);
    });
    test('Many QD prefix', () => {
        const fragments = new LocalizationFragments('<QD_NORMAL>UNCOMFORTABLE<QD_THIN> BUT <QD_NORMAL>SAFE<QD_THIN>?<QD_BR><QD_NORMAL>HOW<QD_THIN> TO GET IN?');
        expect(fragments.prefixes).toEqual(['<QD_NORMAL>', '<QD_THIN>\\S', '\\S<QD_NORMAL>', '<QD_THIN>', '<QD_BR><QD_NORMAL>', '<QD_THIN>\\S']);
        expect(fragments.texts).toEqual(['UNCOMFORTABLE', 'BUT', 'SAFE', '?', 'HOW', 'TO GET IN?']);
    });
    test('Many QD prefix with spaces', () => {
        const fragments = new LocalizationFragments('  <QD_NORMAL>UNCOMFORTABLE  <QD_THIN> BUT <QD_NORMAL>SAFE<QD_THIN>   ?<QD_BR>    <QD_NORMAL>HOW<QD_THIN> TO GET IN?');
        expect(fragments.prefixes).toEqual(['\\S\\S<QD_NORMAL>', '\\S\\S<QD_THIN>\\S', '\\S<QD_NORMAL>', '<QD_THIN>\\S\\S\\S', '<QD_BR>\\S\\S\\S\\S<QD_NORMAL>', '<QD_THIN>\\S']);
        expect(fragments.texts).toEqual(['UNCOMFORTABLE', 'BUT', 'SAFE', '?', 'HOW', 'TO GET IN?']);
    });
    test('Voice one prefix', () => {
        const fragments = new LocalizationFragments('{*1}Thank you for using Detroit Buses.');
        expect(fragments.prefixes).toEqual(['{*1}']);
        expect(fragments.texts).toEqual(['Thank you for using Detroit Buses.']);
    });
    test('Many Voice prefixes', () => {
        const fragraments = new LocalizationFragments('{S}{*1}Thank you for using Detroit Buses. {S}{*3}Alright…{*4}End of the line. {*5}Yeah, you gonna have to leave.');
        expect(fragraments.prefixes).toEqual(['{S}{*1}', '\\S{S}{*3}', '{*4}', '\\S{*5}']);
        expect(fragraments.texts).toEqual(['Thank you for using Detroit Buses.', 'Alright…', 'End of the line.', 'Yeah, you gonna have to leave.']);
    });
    test('Many Voice prefixes with spaces', () => {
        const fragraments = new LocalizationFragments('{S}  {*1}Thank you for using Detroit Buses. {S}{*3}Alright…{*4}   End of the line. {*5} Yeah, you gonna have to leave.');
        expect(fragraments.prefixes).toEqual(['{S}\\S\\S{*1}', '\\S{S}{*3}', '{*4}\\S\\S\\S', '\\S{*5}\\S']);
        expect(fragraments.texts).toEqual(['Thank you for using Detroit Buses.', 'Alright…', 'End of the line.', 'Yeah, you gonna have to leave.']);
    });
    test('Many Voice prefixes with meta-symbols', () => {
        const fragraments = new LocalizationFragments('{S}{*1}Thank you for using \\rDetroit Buses. {S}{*3}Alright…{*4}End of the \\nline. {*5}Yeah, you gonna have to leave.');
        expect(fragraments.prefixes).toEqual(['{S}{*1}', '\\S\\r', '\\S{S}{*3}', '{*4}', '\\S\\n', '\\S{*5}']);
        expect(fragraments.texts).toEqual(['Thank you for using', 'Detroit Buses.', 'Alright…', 'End of the', 'line.', 'Yeah, you gonna have to leave.']);
    });
    test('Prefixes and suffix', () => {
        const fragments = new LocalizationFragments('<QD_NORMAL>HOW<QD_THIN> TO GET IN?\\n');
        expect(fragments.prefixes).toEqual(['<QD_NORMAL>', '<QD_THIN>\\S']);
        expect(fragments.texts).toEqual(['HOW', 'TO GET IN?']);
        expect(fragments.suffix).toEqual('\\n');
    });
    test('QD Prefixes with img tag', () => {
        const fragments = new LocalizationFragments("<QD_NORMAL>REWIND <QD_THIN>WITH <img src='BH_L2' height='52' width='52' vspace='-8'/><QD_BR><QD_THIN>TO TRY ANOTHER ROUTE");
        expect(fragments.prefixes).toEqual(['<QD_NORMAL>', '\\S<QD_THIN>', "\\S<img\\Ssrc='BH_L2'\\Sheight='52'\\Swidth='52'\\Svspace='-8'/><QD_BR><QD_THIN>"]);
        expect(fragments.texts).toEqual(['REWIND', 'WITH', 'TO TRY ANOTHER ROUTE']);
        expect(fragments.suffix).toEqual('');
    });
    test('TV News dialog', () => {
        const fragments = new LocalizationFragments(
            "{S}{*1}The first book written by an artificial intelligence has just been published and to call it a success would be an understatement –"+
            "{B}Do Humans Dream of Mammalian Sheep? has shot to the top of the bestseller list."+
            "{*2}Moreover, critics are unanimous in their praise for the depth of thought and originality of this first work."+
            "\r\n{*3}Designed by CyberLife, the AI known as VOLTAIRE analyzed human centers of interest on social networks for several months before its complex algorithms generated the plot of the novel."+
            "\r\n{*4}According to several specialists, it will be very difficult for human authors to compete with these algorithms and the odds are that most of the books written in the coming years will be the work of artificial intelligence.");
        expect(fragments.prefixes).toEqual(['{S}{*1}','{B}', '{*2}', '\\r\\n{*3}', '\\r\\n{*4}']);
        expect(fragments.texts).toEqual([
            'The first book written by an artificial intelligence has just been published and to call it a success would be an understatement –',
            'Do Humans Dream of Mammalian Sheep? has shot to the top of the bestseller list.',
            'Moreover, critics are unanimous in their praise for the depth of thought and originality of this first work.',
            'Designed by CyberLife, the AI known as VOLTAIRE analyzed human centers of interest on social networks for several months before its complex algorithms generated the plot of the novel.',
            'According to several specialists, it will be very difficult for human authors to compete with these algorithms and the odds are that most of the books written in the coming years will be the work of artificial intelligence.'
        ])
    });
    test('Empty string', () => {
        const fragments = new LocalizationFragments('');
        expect(fragments.prefixes).toEqual(['']);
        expect(fragments.texts).toEqual(['']);
    });
});