import axios from "axios";
import {adminConfig} from "../../config/admin.config";

const API_URL = adminConfig.authentication.authAPI() + "/web-hook-go";

class WebHookGoService {
  getIgnores(params) {
    return axios.get(`${API_URL}/ignores`, { params: params, loading: true });
  }

  createIgnore(newIgnore) {
    return axios.post(`${API_URL}/ignores`, newIgnore);
  }

  getTemplate() {
    return axios.get(`${API_URL}/template`, { loading: true });
  }

  saveTemplate(template) {
    return axios.put(`${API_URL}/template`, template);
  }

  async checkTemplateSyntax(template) {
    return axios.post(`${API_URL}/template/check`, template);
  }

  reloadTemplate() {
    return axios.post(`${API_URL}/template/reload`);
  }
}

const instance = new WebHookGoService()
export {instance as WebHookGoService}
