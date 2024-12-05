import { IQuestionList } from '#types';

export const questionList: Record<string, IQuestionList> = {
  '1': {
    question: 'Komandada necə işləməyi üstün tutursunuz?',
    options: [
      { label: 'Komanda ilə sıx əməkdaşlıq', value: '1' },
      { label: 'Minimum əlaqə ilə işləmək', value: '2' },
      { label: 'Layihədən asılı olaraq', value: '3' },
    ],
  },
  '2': {
    question: 'Texniki bacarıqlarınızın hansı sahəsi güclüdür?',
    options: [
      { label: 'Frontend inkişafı', value: '1' },
      { label: 'Backend inkişafı', value: '2' },
      { label: 'Tam yığın (Full stack)', value: '3' },
    ],
  },
  '3': {
    question:
      'Yeni bir layihəyə başlayarkən ilk növbədə nəyi planlaşdırırsınız?',
    options: [
      {
        label: 'Əsas funksionallığı və arxitekturanı müəyyənləşdirmək',
        value: '1',
      },
      { label: 'Layihə üçün təqvim və büdcə tərtib etmək', value: '2' },
      { label: 'Komanda üzvləri ilə görüşmək və rolu bölüşdürmək', value: '3' },
    ],
  },
  '4': {
    question: 'Hansı proqramlaşdırma dili ilə daha rahat işləyirsiniz?',
    options: [
      { label: 'JavaScript', value: '1' },
      { label: 'Python', value: '2' },
      { label: 'Java', value: '3' },
    ],
  },
  '5': {
    question: 'Çətin və mürəkkəb problemlərlə qarşılaşdıqda necə yanaşırsınız?',
    options: [
      { label: 'Problemi addım-addım həll edirəm', value: '1' },
      { label: 'Komanda ilə birgə müzakirə edirəm', value: '2' },
      { label: 'Əvvəlki təcrübəmdən istifadə edirəm', value: '3' },
    ],
  },
  '6': {
    question: 'Layihənin yekun tarixini keçirdikdə necə davranırsınız?',
    options: [
      { label: 'Təkrardan planlama aparıram', value: '1' },
      { label: 'Müştəri ilə danışıqlar aparıram', value: '2' },
      { label: 'Layihə üzərində əlavə işləyirəm', value: '3' },
    ],
  },
  '7': {
    question: 'Ən böyük peşəkar uğurunuz nə olub?',
    options: [
      {
        label: 'Yüksək qiymətləndirilən bir layihəni başa çatdırmaq',
        value: '1',
      },
      { label: 'Komanda rəhbəri vəzifəsinə yüksəlmək', value: '2' },
      { label: 'Yeni bir texnologiyanı mükəmməl mənimsəmək', value: '3' },
    ],
  },
  '8': {
    question: 'İş yerində hansı mühitdə daha yaxşı çalışırsınız?',
    options: [
      {
        label: 'Yaxşı təşkil edilmiş və aydın tapşırıqlar olan mühitdə',
        value: '1',
      },
      { label: 'Açıq fikirli və yaradıcı mühitdə', value: '2' },
      { label: 'Daha müstəqil və az nəzarət altında', value: '3' },
    ],
  },
  '9': {
    question: 'Yenilikləri necə öyrənirsiniz?',
    options: [
      { label: 'Onlayn kurslar və məqalələr oxuyuram', value: '1' },
      { label: 'Təcrübə yolu ilə öyrənirəm', value: '2' },
      { label: 'Komanda üzvlərindən məsləhət alıram', value: '3' },
    ],
  },
  '10': {
    question: 'İşdə stress və təzyiq altında necə işləyirsiniz?',
    options: [
      {
        label: 'Planlaşdırma və zaman idarəetməsini təkmilləşdirirəm',
        value: '1',
      },
      { label: 'Prioritetləri müəyyənləşdirərək işimi bölürəm', value: '2' },
      {
        label: 'Sakit qalmağa çalışıram və tək başıma həll edirəm',
        value: '3',
      },
    ],
  },
  '11': {
    question: 'Komanda daxilində münaqişə olduqda necə davranırsınız?',
    options: [
      { label: 'Problemi açıq şəkildə müzakirə edirəm', value: '1' },
      { label: 'Sakit qalmağa və problemi həll etməyə çalışıram', value: '2' },
      {
        label: 'Komanda üzvləri arasında barışıq yaratmağa çalışıram',
        value: '3',
      },
    ],
  },
  '12': {
    question:
      'Əgər hər hansı bir layihənin sonunda böyük bir səhv etsəniz, necə reaksiya verirsiniz?',
    options: [
      {
        label:
          'Həmin səhvi düzəltmək və təkrarlanmasından qaçınmaq üçün dərhal hərəkət edirəm',
        value: '1',
      },
      { label: 'Səhvi başa düşüb dərs çıxarmağa çalışıram', value: '2' },
      {
        label:
          'Komanda ilə birlikdə müzakirə edərək nəticələri qiymətləndirirəm',
        value: '3',
      },
    ],
  },
  '13': {
    question:
      'Yeni bir texnologiyanı öyrənməyə başladığınızda hansı yanaşmanı izləyirsiniz?',
    options: [
      { label: 'Təcrübə yolu ilə öyrənməyi üstün tuturam', value: '1' },
      { label: 'Tədris materiallarından istifadə edirəm', value: '2' },
      { label: 'Dərslər və kurslarla təkmilləşməyi seçirəm', value: '3' },
    ],
  },
  '14': {
    question: 'Yaxşı lider olmaq üçün nə qədər vacib olan keyfiyyətlər var?',
    options: [
      { label: 'Ədalət, aydınlıq və motivasiya etmək', value: '1' },
      { label: 'Komandanı dinləmək və hörmətlə yanaşmaq', value: '2' },
      { label: 'İrəliləmək üçün doğru qərarlar vermək', value: '3' },
    ],
  },
  '15': {
    question: 'Bir layihə tamamlandıqdan sonra necə qiymətləndirirsiniz?',
    options: [
      { label: 'Komanda və müştəri geribildirimlərini alaraq', value: '1' },
      { label: 'Başlanğıc məqsədinə nə qədər çatıldığına baxaraq', value: '2' },
      {
        label:
          'Ən vacib nəticələri və gələcəkdə inkişaf etdirilməli sahələri müəyyən edərək',
        value: '3',
      },
    ],
  },
};
