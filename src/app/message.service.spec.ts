import {MessageService} from "./message.service"


describe('MessageService', () => {

  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it('should have no message to start', () => {
    const messageSend = 'Teste serviço de mensagem';
    const listMessageSend = ['Teste serviço de mensagem'];
    service.add(messageSend);
    expect(service.messages.length).toEqual(listMessageSend.length);
  });

  it('should have no messages to start', () => {
    expect(service.messages.length).toEqual(0);
  });

  it('should remove all messages when clear is called', () => {
    service.clear();
    expect(service.messages.length).toEqual(0);
  });
})
