require 'deas/view_handler'

module ViewHandlers

  class Index
    include Deas::ViewHandler

    def run!
      render 'index.html'
    end

  end

end
